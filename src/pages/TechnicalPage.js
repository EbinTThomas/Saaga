import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import axios from '../services/api/axios';
import { ProductList } from '../sections/@dashboard/products';


const EVENTS_URL = '/event/technical/'

export default function TechnicalPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    console.log(isAuthenticated)
    if (isAuthenticated === 'false' || isAuthenticated===null) {
      navigate(
        '/login',
        { replace: true },
      )
    }
  }, [])

  useEffect(() => {
    axios
      .get(
        EVENTS_URL,
        {
          headers: {Authorization: `Token ${localStorage.getItem('access')}`}
        }
      )
      .then((response) => {
        setEvents(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrMsg(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard: Technical Events </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Technical Events
        </Typography>

        <ProductList products={events} />
      </Container>
    </>
  );
}
