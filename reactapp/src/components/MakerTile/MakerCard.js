import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarRatings from 'react-star-ratings';

const styles = theme => ({
	card: {
		width: '31%',
		height: '300px',
		'min-width': '300px',
		margin: '0 0 15px 1.75%',
		fontSize: '24px',
		backgroundColor: theme.palette.secondary.light,
		color: theme.palette.secondary.main,
		// border: '1px solid lightgray',
		cursor: 'pointer',
		position: 'relative',

		['@media (max-width: 1000px)']: {
			width: '47%',
			marginLeft: '2%'
		},

		['@media (max-width: 500px)']: {
			width: '90%',
			margin: '25px auto 30px'
		}
	},
	media: {
		height: 0,
		paddingTop: '100%' // 16:9
	},
	actions: {
		display: 'flex'
	},
	avatar: {
		backgroundColor: red[500]
	}
});

const MakerInfo = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	width: 100%;
`;

class MakerCard extends React.Component {
	state = { expanded: false };

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};
	searchMaker = (e, username) => {
		e.preventDefault();
		console.log(username);
		this.props.fetchSearchResults(username);
	};
	render() {
		const { classes } = this.props;

		return (
			//To do: add info about maker to this card
			<Card
				className={classes.card}
				onClick={e => this.searchMaker(e, this.props.maker.username)}
			>
				<CardMedia className={classes.media} image={this.props.maker.img_url} />

				<CardContent
					style={{
						position: 'absolute',
						bottom: '0',
						width: '100%',
						right: '0',
						// margin: '0 11px 8px 0',
						// alignSelf: 'center',
						padding: '8px 10px 14px',
						background: 'rgba(0, 0, 0, 0.6)'
					}}
				>
					<MakerInfo>
						<h1
							style={{
								fontSize: '2rem',
								color: 'white'
							}}
						>
							{this.props.maker.username}
						</h1>

						<StarRatings
							rating={Number(this.props.maker.user_rating)}
							starDimension="19px"
							starSpacing="1px"
							starRatedColor="gold"
							starEmptyColor="gray"
						/>
					</MakerInfo>
				</CardContent>

				<CardActions className={classes.actions} disableActionSpacing />
			</Card>
		);
	}
}

MakerCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MakerCard);
