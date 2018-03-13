import escape from 'pg-escape';

const escapeParam = (param) => escape('%s', param);

export const locationSearchQuery = (lat, lng) => {
  const latEscaped = escapeParam(lat);
  const lngEscaped = escapeParam(lng);
  
  if (isNaN(latEscaped) || isNaN(lngEscaped)) throw new Error('Integer lat/lng values must be provided')

  // query shamelessly nicked from
  // https://www.scribd.com/presentation/2569355/Geo-Distance-Search-with-MySQL
  // sample set quite small, not using square box optimisation for now
  
  const query = [
    `SELECT *,`,
    ` 3956 * 2 * ASIN(SQRT( POWER(SIN((${latEscaped} - abs(dest.lat)) * pi()/180 / 2),2)`,
    ` + COS(${latEscaped} * pi()/180 ) * COS(abs(dest.lat) *  pi()/180) * `,
    ` POWER(SIN( ( (${lngEscaped} - dest.lng ))  *  pi()/180 / 2), 2) )) as distance`,
    ` FROM items dest`,
    ` ORDER BY distance`,
  ].join('');
  return query;
}

