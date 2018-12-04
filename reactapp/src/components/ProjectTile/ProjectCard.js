import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';


const styles = theme => ({
  card: {
    maxWidth: 300,
    margin: '25px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class ProjectCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    return (
<Link to={`project/${this.props.project.user_id}`}>
        <Card style={{}}className={classes.card}>
         
          <CardHeader
            avatar={
              <Avatar aria-label="Rrecipe" className={classes.avatar}>
                {/* <img src={ this.props.userInfo.img_url ? this.props.userInfo.img_url : 'https://previews.123rf.com/images/alekseyvanin/alekseyvanin1801/alekseyvanin180100897/93405661-user-account-avatar-line-icon-outline-vector-sign-linear-style-pictogram-isolated-on-white-admin-pro.jpg'} alt="user profile pic" /> */}
              </Avatar>
            }
            action={null}
            title={this.props.project.project_name}
            subheader={<a href="#helloWorld">{this.props.project.username} </a>}
          />
           
          <CardMedia
            className={classes.media}
            image={this.props.project.img_url}
            title={this.props.project.project_name}
          />
        
          <CardContent>
            <Typography component="p">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing />
         
        </Card>
        </Link>
    
    );
  }
}

ProjectCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectCard);
