import 'react-photoswipe/lib/photoswipe.css';
import {  Container, Image, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import PSGallery from '../../../app/common/util/PSGallery';


interface Props {
    items: any[],
    id: string,
    title: string
}

  
export default observer(function EventoGallery({items, id, title} : Props) {
     
 
var openPhotoSwipe = function() {
  var pswpElement = document.querySelectorAll('.pswp')[0];

  
  // define options (if needed)
  var options = {
     // history & focus options are disabled on CodePen        
      history: false,
      focus: false,

      showAnimationDuration: 0,
      hideAnimationDuration: 0
      
  };
  
  var gallery = new PhotoSwipe( pswpElement as HTMLElement  , PhotoSwipeUI_Default, items, options);
  gallery.init();
};


    return (
        <>
        <Label content={<>{title}<Label style={{marginLeft:5}} circular color='blue' size='tiny'>{items.length}</Label></>} ribbon style={{opacity:0.7}} color='orange' size='tiny'  />
        
        <Container style={{display:'flex',alignItems:'center'}}>
        {items.slice(0,7).map(image => (
          <Image key={image.thumbnail} verticalAlign={'middle'} src={image.thumbnail} title={image.title} style={{ maxHeight:'100px', maxWidth:'100px',float:'left',marginLeft:'10px', border:'none', cursor:'pointer'}} as='button' onClick={openPhotoSwipe}  />
        )
        )}
        </Container>
            <PSGallery />
        </>
    )
})