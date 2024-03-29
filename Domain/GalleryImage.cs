using System;
using System.Collections.Generic;

namespace Domain
{
    public class GalleryImage
    {
        public Guid GalleryId { get; set; }
        public Gallery Gallery { get; set; }
        public Guid ImageId { get; set; }
        public Image Image { get; set; } 
        public int Order { get; set; }
        public string Title { get; set; }
    }
}