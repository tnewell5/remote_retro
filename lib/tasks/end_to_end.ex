defmodule Mix.Tasks.EndToEnd do
  use Mix.Task

  @shortdoc "Runs feature tests"
  def run(_) do
    compile_js()
    System.cmd(
      "mix",
      ["test", "test/features/", "--only", "feature_test", "--color"],
      into: IO.stream(:stdio, :line)
    )
  end

  defp compile_js do
    System.cmd("npm", ["run", "deploy", "--", "--hide-modules"], [into: IO.stream(:stdio, :line)])
  end
end
