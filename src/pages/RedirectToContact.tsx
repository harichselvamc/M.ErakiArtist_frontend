import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToContact = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/contact');
  }, [navigate]);

  return null;
};

export default RedirectToContact;
