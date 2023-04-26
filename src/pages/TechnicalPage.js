import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import useAxiosPrivate from '../services/hooks/useAxiosPrivate';
import axios from '../services/api/axios';
import { ProductList } from '../sections/@dashboard/products';

const EVENTS_URL = '/event/technical/'

export default function TechnicalPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  // const axiosPrivate = useAxiosPrivate()

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const navigator = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token == null){
      navigator('/login')
    }
    const headers = {
      Authorization: `Token ${token}`
    };

    axios
      .get(EVENTS_URL, { headers })
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
