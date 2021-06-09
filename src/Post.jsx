import React from 'react'
import "./Post.css";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import {  CardActionArea, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
    
  });
function Post({BrandId,Description,Name}) {
    const classes = useStyles();
    return (
        <div className="post">
           
        
        <Card style={{Cursor:"pointer"}} className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          name :{Name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          description :{Description}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
          BrandId : {BrandId}
          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card>


        </div>

    )
}

export default Post
