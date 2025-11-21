package server.paperwork;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public interface ContentFormT {
  @NotBlank(message = "content required")
  @Size(max = 250, message = "max length exceeded")
  public abstract String getContent();
}
