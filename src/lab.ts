import { execSync } from "child_process";

export function findJupyterLab(): string {
  const pythonCommand = `python -c "import jupyterlab; from pathlib import Path; print(Path(jupyterlab.__file__).parent / 'staging')"`;

  try {
    const stdout = execSync(pythonCommand);
    return stdout.toString().trim();
  } catch (error: any) {
    throw new Error(`Failed to find Python module path: ${error.message}`);
  }
}
