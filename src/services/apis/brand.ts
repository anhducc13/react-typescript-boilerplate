import { requestServices } from 'services';
import { IBrandFilters } from 'interfaces';

const { catalogClient } = requestServices;

const getBrands = (params: IBrandFilters) => {
  return catalogClient.get('/brands', {
    params,
  });
};

export default {
  getBrands,
};
