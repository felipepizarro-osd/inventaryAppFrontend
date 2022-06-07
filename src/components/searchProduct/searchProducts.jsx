import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './searchProducts.scss'
function searchProducts() {
    return (
        <div className='Buscar'>
            <div className='top'>
                <div className='title'>
                    Sistema de Inventario
                </div>
            </div>

            <div className='container'>
                <Card sx={{ maxWidth: 600 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        alt="green iguana"
                    />
                    <CardContent className='contenido'>
 
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    )
}

export default searchProducts