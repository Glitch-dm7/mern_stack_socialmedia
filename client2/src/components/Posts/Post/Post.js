import { Button, CardActionArea, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';


import useStyles from './styles';


const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.sub || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`)
  };

  return (
    <>
      <Card className={classes.card} raised elevation={6} sx={{borderRadius: '15px', display: "block"}}>
        <CardActionArea onClick={openPost}>
          <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
          <div className={classes.overlay}>
            <Typography variant='h6'>{post.name}</Typography>
            <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
          </div>
          <div className={classes.details}>
            <Typography variant='body2' color="text.secondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
          </div>
          <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
          <CardContent>
            <Typography variant='body1' color="text.secondary" component="p" gutterBottom>{post.message}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" disabled={user===null} onClick={() => dispatch(likePost(post._id))}>
            <Likes />
          </Button>
          {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
            <div className={classes.overlay2}>
              <Button style={{color: 'white'}} size='small' onClick={() => setCurrentId(post._id)}>
                <MoreHorizIcon fontSize="large" />
              </Button>
            </div>
          )}
          {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
            <Button size="small" color="error" onClick={() => dispatch(deletePost(post._id))}>
              <DeleteIcon fontSize='small'/>
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  )
}

export default Post 