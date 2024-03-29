using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Persistence;
using System.Drawing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Application.Images
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public List<Domain.Image> Images { get; set; }
            public string Title { get; set; }
            public Guid GalleryId { get; set; }
            public Guid EventoId { get; set; }
        }


        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly ILogger<Create> _logger;
            public Handler(DataContext context, IUserAccessor userAccessor, ILogger<Create> logger)
            {
                _logger = logger;
                _userAccessor = userAccessor;
                _context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var userId = _userAccessor.GetUserId();

                var Gallery = await _context.Galleries.FindAsync (request.GalleryId);    
                if (Gallery == null)
                {
                    //return Result<Unit>.Failure("La URL '"+(request.Evento.Url).Substring(0,20)+"' ya existe, y debe ser única. Por favor prueba otra diferente.");
                    Gallery = new Gallery { Id = request.GalleryId, Title = request.Title, AppUserId = userId};
                    _context.Galleries.Add(Gallery);
                }

                List<Domain.Image> images = request.Images;
                var orderCount = 0;
                images.ForEach(image =>
                {
                    _context.Images.Add(image);
                    //Console.WriteLine(image.Title+" - "+image.Filename+" - "+image.H+" - "+image.Id+" - "+image.Src+" - "+image.Thumbnail+" - "+image);
                    //637508478995547212.png - 637508478995547212.png - 949 - 64def9b9-3d59-4f18-b54b-31900067d304 - /assets/galleryImages/637508478995547212.png - /assets/galleryImages/637508478995547212_thumb.png - 1600
                    Console.WriteLine("------------------");
                    Console.WriteLine(request.GalleryId+ " and "+ image.Id);
                    Console.WriteLine("------------------");
                    _context.GalleryImages.Add(new GalleryImage { GalleryId = request.GalleryId, ImageId = image.Id, Gallery = Gallery, Image = image, Order = orderCount, Title = "" });
                    orderCount++;
                });
                var result = await _context.SaveChangesAsync() > 0;
                if (result)
                {
                    var galleryEvento = _context.GalleryEventos.Where(x => x.EventoId == request.EventoId).OrderByDescending(x => x.Order);
                    var order = 0;
                    if (galleryEvento.Count() > 0) {
                        var lastItem = await galleryEvento.FirstAsync();
                        order = lastItem.Order+1;
                    }
                    
                    _context.GalleryEventos.Add(new GalleryEvento { GalleryId = request.GalleryId, EventoId = request.EventoId, Title = request.Title, Order = order });
                    result = await _context.SaveChangesAsync() > 0;
                }

                if (result)
                    return Result<Unit>.Success(Unit.Value);
                else
                    return Result<Unit>.Failure("Error Al crear entidades");
            }

        }
    }
}