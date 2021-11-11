import { AppBar }  from "@material-ui/core";
import { Container, Toolbar, Typography } from "@material-ui/core";
import moment from "moment";
import "./Footer.css";

const Footer = () => {
  return (
    <AppBar position="static" color="primary" data-testid="footer">
      <Container maxWidth="md">
        <Toolbar>
          <Typography color="inherit">
            © {moment().format("YYYY")} Brightwheel
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
