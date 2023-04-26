import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Stack, Typography } from '@mui/material';
// import useAxiosPrivate from '../services/hooks/useAxiosPrivate';
import axios from '../services/api/axios';
import { ProductList } from '../sections/@dashboard/products';

const EVENTS_URL = '/event/cultural/'

export default function CulturalPage() {
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
      .get(EVENTS_URL,
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
        <title> Dashboard: Cultural Events </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Cultural Events
        </Typography>

        <ProductList products={events} />
      </Container>
    </>
  );
}
