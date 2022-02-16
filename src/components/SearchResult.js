import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StarsIcon from '@material-ui/icons/Stars';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const SearchResult = ({ dataElement }) => {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;
  let pageUrl = `https://www.imdb.com/title/${dataElement.id}`
  return (
    <Card style={{ margin: "10px 0" }} className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2" style={{ marginBottom: '16px', fontSize: '24px', fontWeight: '700' }}>
          <a style={{ color: '#e5e5e5', textDecoration: 'unset' }} href={pageUrl} target="_blank" rel="noopener noreferrer">{dataElement.title}</a>
        </Typography>
         <Box display="flex" flexDirection="row">
          <Typography className={classes.pos} color="textSecondary">
            <img style={{ width: '120px' }} onError={({currentTarget}) => {
                currentTarget.onerror = null;
                currentTarget.src = 'images/no-image.png';
              }} src={dataElement.image_url} />
          </Typography>
          <Box display="flex" flexDirection="column" style={{ paddingLeft: '16px' }}>
            <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center" style={{ marginBottom: '8px' }}>
              <StarsIcon style={{ marginRight: '8px', color: 'rgb(255, 152, 0)' }} />
              <Typography variant="body2" component="p" style={{ fontSize: '16px', fontWeight: '700' }}>
                {dataElement.rating}&nbsp;
              </Typography>
              <Typography variant="body2" component="p" style={{ fontSize: '16px', fontWeight: '700', color: 'rgba(109,109,110,0.7)' }}>
                / 10
              </Typography>
            </Box>
            <Typography variant="body2" component="p" style={{ fontSize: '16px' }}>
              {dataElement.year} - {dataElement.plot}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SearchResult;
