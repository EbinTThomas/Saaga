import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <Link to='../user'>
            <ShopProductCard product={product} />
            </Link>
            
          </Grid>
      ))}
    </Grid>
  );
}
