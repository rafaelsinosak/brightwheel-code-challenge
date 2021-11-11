import { AppBar,Toolbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "./Header.css";

const Header = () => {
  return (
    <div className="root" data-testid="header">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="title">
            Brightwheel Code Challenge
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
