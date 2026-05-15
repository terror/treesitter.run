use {
  super::*,
  indicatif::{ProgressBar, ProgressStyle},
};

#[derive(Debug)]
pub(crate) struct Reporter {
  progress: ProgressBar,
}

impl Reporter {
  pub(crate) fn done(&self) {
    self.progress.finish_with_message(
      style("done").for_stderr().green().bold().to_string(),
    );
  }

  pub(crate) fn finish_step(&self, status: &str, message: &str) {
    self.progress.inc(1);

    let message =
      format!("{} {}", style(status).for_stderr().green().bold(), message);

    if self.progress.is_hidden() {
      eprintln!("{message}");
    } else {
      self.progress.println(message);
    }
  }

  pub(crate) fn new() -> Result<Self> {
    let progress = ProgressBar::new(0);

    progress.set_style(
      ProgressStyle::with_template(
        "[{bar:32.cyan/blue}] {pos:>2}/{len:2} {msg}",
      )?
      .progress_chars("=>-"),
    );

    Ok(Self { progress })
  }

  pub(crate) fn reset(&self, len: u64) {
    self.progress.reset();
    self.progress.set_length(len);
  }

  pub(crate) fn start_step(&self, status: &str, message: &str) {
    self.progress.set_message(format!(
      "{} {}",
      style(status).for_stderr().cyan().bold(),
      message
    ));
  }
}
