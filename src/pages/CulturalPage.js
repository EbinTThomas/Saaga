import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Container, Stack, Typography, TextField } from '@mui/material';
import axios from '../services/api/axios';
import { ProductList } from '../sections/@dashboard/products';


const EVENTS_URL = '/event/cultural/'

export default function CulturalPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [searchValue, setSearchValue] = useState('');

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
        setFilteredEvents(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrMsg(err);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    const searchVal = event.target.value;
    setSearchValue(searchVal);
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(searchVal.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Cultural Events </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Cultural Events
        </Typography>

        <TextField
          label="Search Events"
          variant="outlined"
          fullWidth
          value={searchValue}
          onChange={handleSearch}
          sx={{ mb: 3 }}
        />
        {filteredEvents.length === 0
        ? <>No Entries</>
        : <ProductList products={filteredEvents} />
        }  
      </Container>
    </>
  );
}
