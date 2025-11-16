package server.models.images.etc;

import java.util.UUID;

import org.springframework.stereotype.Service;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.models.images.Image;

@Service
@SuppressFBWarnings({ "EI2", "EI" })
@RequiredArgsConstructor
public final class ImageSvc {
  private final ImageRepo imageRepo;

  public final Mono<Image> insert(Image image) {
    return imageRepo.insert(image);
  }

  public final Mono<Image> byId(UUID id) {
    return imageRepo.findById(id);
  }
}