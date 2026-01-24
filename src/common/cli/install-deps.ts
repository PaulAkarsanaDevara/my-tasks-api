import ora from 'ora';
import { execa } from 'execa';

const spinner = ora('Installing dependencies...').start();

try {
  execa('npm', ['install'], { stdio: 'inherit' });
  spinner.succeed('Dependencies installed successfully');
} catch (err) {
  spinner.fail('Failed to install dependencies');
  process.exit(1);
}
