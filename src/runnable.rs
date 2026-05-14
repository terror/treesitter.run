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

    if !output.status.success() {
      let mut message = format!("{} exited with {}", display, output.status);

      for (label, output) in [
        ("stdout", output.stdout.as_slice()),
        ("stderr", output.stderr.as_slice()),
      ] {
        let output = String::from_utf8_lossy(output);

        let output = output.trim();

        if !output.is_empty() {
          message.push_str("\n\n");
          message.push_str(label);
          message.push_str(":\n");
          message.push_str(output);
        }
      }

      bail!("{message}");
    }

    Ok(output)
  }
}
