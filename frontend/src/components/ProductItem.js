import { useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Rating } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import { userInfo } from "../services/DataStore";

export default function ProductItem({ item }) {
  const [like, setLike] = useState(false);
  const FavRef = useRef(null);
  const [showDialog, setShowDialog] = useState(false);

  const addItemToRent = async () => {
    try {
    const res = await fetch(`http://localhost:8000/rent`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token ' + userInfo.token
      },
      method: 'POST',
      body: JSON.stringify({
        productId:item._id,
        productName: item.name,
        pricePerDay:item.price_per_day,
      })
    })
    // navigate('/profile')
  } catch (error) {
    console.log(`Error ${error}`);
  }
  }

  const changeLikeButton = () => {
    if (!like) {
      FavRef.current.style.fill = "red";
    } else {
      FavRef.current.style.fill = "gray";
    }
    setLike(!like);
  };

  return (
    <Card sx={{ maxWidth: 345 }} className="mb-4">
      <CardHeader
        avatar={
          <Link to={`${!userInfo.token ? "/" : `/profile/${item.ownerId}`}`}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          </Link>
        }
        title={item.name}
        subheader={item.category}
      />
      <CardMedia
        component="img"
        height="194"
        image={item.image_url}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary">
          Price/day : ${item.price_per_day}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={changeLikeButton}>
          <FavoriteIcon ref={FavRef} style={{ fill: "gray" }} />
        </IconButton>
        <IconButton
          aria-label="share"
          onClick={() => setShowDialog(!showDialog)}
        >
          <ShareIcon />
        </IconButton>
        <Dialog open={showDialog} onClose={() => setShowDialog(!showDialog)}>
          <div className="w-20 flex flex-row "></div>
          <WhatsappShareButton
            url={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_FWF2judaujT30K9sMf-tZFhMWpgP6xCemw&s"
            }
          >
            <WhatsappIcon />
          </WhatsappShareButton>
        </Dialog>
        <Rating
          name="half-rating-read"
          defaultValue={2.5}
          precision={0.5}
          readOnly
        />

        {item.availability_status === "available" ? (
          <Button variant="contained" color="primary" onClick={addItemToRent}>
            Rent
          </Button>
        ) : (
          <Button variant="contained" color="primary" disabled>
            Unavailable
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
