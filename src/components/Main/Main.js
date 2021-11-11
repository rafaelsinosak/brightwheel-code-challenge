import { useEffect, useState } from 'react'

import "./Main.css";
import  { 
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  IconButton,
  Tooltip,
  Typography, } from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search'
import FavoriteIcon from '@mui/icons-material/Favorite'
import debounce from 'lodash.debounce'
import Http from '../../services/http'

const Main = () => {
  const QUERY = {
    _page: 1,
    _limit: 10
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState({ ...QUERY });
  const [totalStarred, setTotalStarred] = useState();

  const handleSearch = async (props) => {
    props.preventDefault();

    if (!props.target.value || !props.target.value.trim()) {
      setQuery({ ...QUERY });
    } else {
      delete query.starred;
      setQuery({
        ...query,
        q: props.target.value.trim(),
      });
    }
  };

  const handleDebounce = debounce(handleSearch, 200);

  const handleToggleItem = async (id, starred) => {
    setLoading(true);
    try {
      await Http.starItem(id, starred);

      setTotalStarred(
        await Http.getResultsStarred()
      );

      const index = items.findIndex((item) => item.id === id);
      items[index].starred = starred;
      
      setItems([...items]);
      setItems(
        await Http.getAllResults(query)
        );
    } catch (error) {
      setError(true);
    } finally{
      
      setLoading(false);
    }
  };

  const handleFilterStarred = () => {
    if (query.starred) {
      delete query.starred;
    } else {
      query.starred = true;
    }
    setQuery({ ...query });
  };

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      setError(false);
      try {
        setItems(
          await Http.getAllResults(query)
          );

        setTotalStarred(
          await Http.getResultsStarred()
          );

        setError(false);
      } catch (error) {
        setError(true);
      }
      finally{
        setLoading(false);
      }
    };
    loadItems();
  }, [query]);

  return (
    <Grid data-testid="main">
      <Container maxWidth="sm">
        <FormControl fullWidth sx={{ m: 1 }}>
            <Input className="input-box" onChange={handleDebounce}
              placeholder="Search"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              label="Search"
            />
      </FormControl>
      {
        loading && (
          <CircularProgress />
        )
      }
      {
        error && (
          <>There is a error on this page, please refresh it</>
        )
      }
      Total items starred: {totalStarred}
      <Button variant="text" onClick={handleFilterStarred} data-testid="starred-button">
        {query.starred ? 'See all' : 'See starred'} Items
      </Button>
      {
        items.map( item => {
          return(
            <Card className="card" key={item.id}>
            <CardHeader
            avatar={
                <Avatar aria-label="recipe" className="avatar">
                    <img src={item.image} alt={item.name}></img>
                </Avatar>
            }
            title={item.name}
            titleTypographyProps={{ variant: "h5" }}
            subheader={item.type}
            />
            <CardContent>
            <Typography variant="body1" color="textSecondary" component="p">
            {(() => {
              switch(item.type){
                case 'product':
                  return (<>
                    <p>Category: {item.productCategory}<br/>
                    Preview text: {item.previewText}</p>
                    </>);
                case 'animal':
                  return (<p>Scientific name: {item.taxonomy.scientificName}</p>);
                case 'company':
                  return (<>
                    <p>Description: {item.description}<br/>
                    Adress: {item.address.address1}<br/>
                    City: {item.address.city}<br/>
                    State: {item.address.state}<br/>
                    Postal Code: {item.address.postalCode}</p>
                  </>);
                default:
                  break;
              }
            })()}
            </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Tooltip title="Add to favorites">
                <IconButton
                  aria-label="add to favorites"
                  style={{ color: item.starred ? "red" : "inherit" }}
                  onClick={() => 
                    {
                      handleToggleItem(item.id, item.starred)
                    }
                  }
                >
                  <FavoriteIcon  />
                  <span className="actionCounter"></span>
                </IconButton>
              </Tooltip>
            </CardActions>
        </Card>
          )
        })
        }
      </Container>
    </Grid>
  );
};

export default Main;
