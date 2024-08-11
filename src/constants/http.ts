// Ideally we will keep this in a .env file
export const BASE_URL = 'https://api.openalex.org';

export const baseQueryParams = {
  select: 'id,display_name,doi,publication_date,publication_year',
  sort: 'publication_date:desc'
};
