import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Upload, CreditCard, Info, Check } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDropzone } from 'react-dropzone';
import QRCode from 'qrcode.react';
import { addDays, format } from 'date-fns';
import { Product, SizeOption, ColorOption } from '../../types';

interface OrderFormProps {
  product: Product;
}

const OrderForm: React.FC<OrderFormProps> = ({ product }) => {
  const navigate = useNavigate();
  const minDate = addDays(new Date(), 5);
  
  const [formStep, setFormStep] = useState(1);
  const [size, setSize] = useState<SizeOption>(product.sizes[0]);
  const [color, setColor] = useState<ColorOption>(product.colors[0]);
  const [deliveryDate, setDeliveryDate] = useState<Date>(minDate);
  const [text, setText] = useState('');
  const [notes, setNotes] = useState('');
  const [referenceImages, setReferenceImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  
  // Calculate prices
  const basePrice = product.price;
  const sizeModifier = size?.priceModifier || 0;
  const totalPrice = basePrice + sizeModifier;
  const advanceAmount = Math.round(totalPrice * 0.5);
  
  // Generate UPI link
  const upiLink = `upi://pay?pa=7598068106@pthdfc&pn=harichselvamc&cu=INR&am=${advanceAmount}`;
  
  // Dropzone for reference images
  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: 5242880, // 5MB
    onDrop: (acceptedFiles) => {
      if (product.maxImages && referenceImages.length + acceptedFiles.length > product.maxImages) {
        alert(`You can only upload up to ${product.maxImages} images`);
        return;
      }
      setReferenceImages([...referenceImages, ...acceptedFiles]);
    }
  });
  
  // Dropzone for payment screenshot
  const { getRootProps: getPaymentRootProps, getInputProps: getPaymentInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: 5242880, // 5MB
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setPaymentScreenshot(acceptedFiles[0]);
    }
  });
  
  const handleRemoveImage = (index: number) => {
    const newImages = [...referenceImages];
    newImages.splice(index, 1);
    setReferenceImages(newImages);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Generate a simple order ID
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    
    try {
      // Upload reference images first
      const referenceImageUrls = [];
      if (referenceImages.length > 0) {
        const uploadPromises = referenceImages.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          
          const uploadResponse = await fetch('https://m-erakiartist-backend.onrender.com/api/upload', {
            method: 'POST',
            body: formData,
          });
          
          const uploadData = await uploadResponse.json();
          if (uploadResponse.ok && uploadData.success) {
            return uploadData.fileUrl;
          }
          throw new Error('Failed to upload reference image');
        });
        
        referenceImageUrls.push(...(await Promise.all(uploadPromises)));
      }

      // Upload payment screenshot
      let paymentScreenshotUrl = null;
      if (paymentScreenshot) {
        const formData = new FormData();
        formData.append('file', paymentScreenshot);
        
        const uploadResponse = await fetch('https://m-erakiartist-backend.onrender.com/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        const uploadData = await uploadResponse.json();
        if (uploadResponse.ok && uploadData.success) {
          paymentScreenshotUrl = uploadData.fileUrl;
        } else {
          throw new Error('Failed to upload payment screenshot');
        }
      }
      
      // Create the order details object
      const orderDetails = {
        orderId,
        productName: product.name,
        size: `${size.name} (${size.dimensions})`,
        color: color.name,
        deliveryDate: format(deliveryDate, 'MMMM d, yyyy'),
        totalPrice,
        advanceAmount,
        balanceAmount: totalPrice - advanceAmount,
        text: product.requiresText ? text : undefined,
        notes: notes || 'No additional notes',
        referenceImages: referenceImageUrls.length > 0 ? referenceImageUrls : undefined,
      };

      // Send the order data to your backend API
      const response = await fetch('https://m-erakiartist-backend.onrender.com/api/send-order-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderDetails,
          customerEmail,
          customerName,
          customerPhone,
          address,
          paymentScreenshotUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send confirmation emails');
      }

      // Navigate to thank you page
      navigate('/thank-you', {
        state: {
          orderId,
          customerName,
          customerEmail,
        }
      });
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error submitting your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const nextStep = () => {
    window.scrollTo(0, 0);
    setFormStep(formStep + 1);
  };
  
  const prevStep = () => {
    window.scrollTo(0, 0);
    setFormStep(formStep - 1);
  };
  
  // Validation
  const isStep1Valid = () => {
    if (product.requiresText && !text.trim()) return false;
    if (product.requiresImage && referenceImages.length === 0) return false;
    return true;
  };
  
  const isStep2Valid = () => {
    return paymentScreenshot !== null;
  };
  
  const isStep3Valid = () => {
    return (
      customerName.trim() !== '' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail) &&
      /^\d{10}$/.test(customerPhone) &&
      address.trim() !== ''
    );
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Order {product.name}</h1>
        
        {/* Order Steps Indicator */}
        <div className="flex items-center justify-center mb-10">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            formStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            1
          </div>
          <div className={`h-1 w-16 ${formStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            formStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            2
          </div>
          <div className={`h-1 w-16 ${formStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            formStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            3
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Step 1: Product Customization */}
          {formStep === 1 && (
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Customize Your Order</h2>
              
              <div className="space-y-6">
                {/* Size Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Size & Dimensions</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {product.sizes.map((sizeOption) => (
                      <div
                        key={sizeOption.id}
                        className={`border rounded-md p-3 cursor-pointer transition-all ${
                          size.id === sizeOption.id 
                            ? 'border-blue-600 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                        onClick={() => setSize(sizeOption)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{sizeOption.name}</span>
                          {size.id === sizeOption.id && <Check className="w-4 h-4 text-blue-600" />}
                        </div>
                        <p className="text-sm text-gray-500">{sizeOption.dimensions}</p>
                        <p className="text-sm font-medium mt-1">
                          {sizeOption.priceModifier > 0 
                            ? `+₹${sizeOption.priceModifier}`
                            : 'No additional cost'
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Color Options</label>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((colorOption) => (
                      <div
                        key={colorOption.id}
                        className={`flex flex-col items-center cursor-pointer`}
                        onClick={() => setColor(colorOption)}
                      >
                        <div 
                          className={`w-12 h-12 rounded-full ${
                            color.id === colorOption.id ? 'ring-2 ring-offset-2 ring-blue-600' : ''
                          }`}
                          style={{ backgroundColor: colorOption.hex }}
                        ></div>
                        <span className="text-xs mt-1">{colorOption.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Delivery Date */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Delivery Date
                    <span className="text-gray-500 text-xs ml-2">(minimum 5 days from today)</span>
                  </label>
                  <div className="relative">
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Calendar className="w-5 h-5" />
                      </span>
                      <DatePicker
                        selected={deliveryDate}
                        onChange={(date: Date) => setDeliveryDate(date)}
                        minDate={minDate}
                        className="form-input block w-full rounded-l-none border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        dateFormat="MMMM d, yyyy"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    We need at least 5 days to prepare and ship your custom artwork.
                  </p>
                </div>
                
                {/* Text Input for Calligraphy */}
                {product.requiresText && (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Your Text
                      <span className="text-red-500 text-xs ml-2">(required)</span>
                    </label>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="form-textarea block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      placeholder="Enter the text you want for your calligraphy..."
                      rows={4}
                      required={product.requiresText}
                    />
                  </div>
                )}
                
                {/* Image Upload for Reference */}
                {product.requiresImage && (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Reference Images
                      <span className="text-red-500 text-xs ml-2">(required)</span>
                    </label>
                    <div 
                      {...getImageRootProps()} 
                      className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <input {...getImageInputProps()} />
                      <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">
                        Drag and drop images here, or click to select files
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Maximum {product.maxImages || 5} images, 5MB per image
                      </p>
                    </div>
                    
                    {referenceImages.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {referenceImages.map((file, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Reference ${index + 1}`}
                              className="w-full h-24 object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-1 right-1 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Additional Notes
                    <span className="text-gray-500 text-xs ml-2">(optional)</span>
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="form-textarea block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="Add any specific instructions or details about your order..."
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStep1Valid()}
                  className={`px-6 py-2 rounded-md font-medium ${
                    isStep1Valid() 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}
          
          {/* Step 2: Payment Information */}
          {formStep === 2 && (
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Payment Information</h2>
              
              <div className="mb-8 p-4 bg-blue-50 rounded-md">
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-blue-900 font-medium">Payment Instructions</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Please pay 50% advance (₹{advanceAmount}) using the UPI QR code below. 
                      The remaining amount will be collected before shipping.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-white p-4 border border-gray-200 rounded-lg flex flex-col items-center">
                    <p className="text-center mb-4 font-medium">Pay ₹{advanceAmount} Advance</p>
                    <QRCode value={upiLink} size={180} className="mb-3" />
                    <p className="text-sm text-gray-500 text-center">
                      UPI ID: 7598068106@pthdfc
                    </p>
                  </div>
                </div>
                
                <div>
                  <div
                    {...getPaymentRootProps()}
                    className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-blue-500 transition-colors mb-6"
                  >
                    <input {...getPaymentInputProps()} />
                    <CreditCard className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-700 font-medium">Upload Payment Screenshot</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Click or drag and drop your payment confirmation
                    </p>
                  </div>
                  
                  {paymentScreenshot && (
                    <div className="mb-6">
                      <p className="text-sm font-medium mb-2 text-gray-700">Uploaded Screenshot:</p>
                      <div className="flex items-center">
                        <img
                          src={URL.createObjectURL(paymentScreenshot)}
                          alt="Payment screenshot"
                          className="w-16 h-16 object-cover rounded-md mr-3"
                        />
                        <div>
                          <p className="text-sm truncate">{paymentScreenshot.name}</p>
                          <p className="text-xs text-gray-500">
                            {(paymentScreenshot.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStep2Valid()}
                  className={`px-6 py-2 rounded-md font-medium ${
                    isStep2Valid() 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Continue to Shipping
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Shipping Information */}
          {formStep === 3 && (
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Shipping Information</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Full Name
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="form-input block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Phone Number
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="form-input block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      placeholder="10-digit mobile number"
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Email Address
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="form-input block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="Your email address"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Shipping Address
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-textarea block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="Enter your full shipping address including pin code"
                    rows={3}
                    required
                  />
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
                <h3 className="font-medium mb-2 text-gray-800">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product:</span>
                    <span className="font-medium">{product.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span>{size.name} ({size.dimensions})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Color:</span>
                    <span>{color.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Date:</span>
                    <span>{format(deliveryDate, 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="border-t border-gray-200 my-2 pt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total Price:</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>Advance Paid:</span>
                      <span>₹{advanceAmount.toLocaleString()} (50%)</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>Balance Due:</span>
                      <span>₹{(totalPrice - advanceAmount).toLocaleString()} (50%)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!isStep3Valid() || isSubmitting}
                  className={`px-6 py-2 rounded-md font-medium ${
                    isStep3Valid() && !isSubmitting
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Place Order'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default OrderForm;