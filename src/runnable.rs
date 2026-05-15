use super::*;

pub(crate) trait Runnable {
  type Output;

  fn run(&mut self) -> Result<Self::Output>;
}

impl Runnable for Command {
  type Output = Output;

  fn run(&mut self) -> Result<Self::Output> {
    let display = iter::once(self.get_program())
      .chain(self.get_args())
      .map(|argument| argument.to_string_lossy())
      .collect::<Vec<_>>()
      .join(" ");

    let output = self.output()?;

    if output.status.success() {
      return Ok(output);
    }

    let mut message = format!("{display} exited with {}", output.status);

    for (label, bytes) in
      [("stdout", &output.stdout), ("stderr", &output.stderr)]
    {
      let text = String::from_utf8_lossy(bytes).trim().to_owned();

      if text.is_empty() {
        continue;
      }

      let _ = write!(message, "\n\n{label}:\n{text}");
    }

    bail!("{message}");
  }
}
