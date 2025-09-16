{
  description = "Devshell for Hugo.";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = {
    self,
    nixpkgs,
  }: let
    system = "x86_64-linux";
    pkgs = import nixpkgs {inherit system;};
  in {
    devShells.${system}.default = pkgs.mkShell {
      # Add packages here.
      buildInputs = with pkgs; [
        nodejs
        hugo
        just
      ];

      # Shell hooks.
      shellHook = ''
        echo "Entering the development environment!"
        hugo version
        npm install --no-save prettier prettier-plugin-go-template
        trap 'echo "Leaving the development environment!"' EXIT
      '';
    };
  };
}
