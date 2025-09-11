#!/bin/bash
set -e

echo "[INFO] Removing old Docker configurations if exist..."
sudo rm -f /etc/apt/sources.list.d/docker.list
sudo rm -f /etc/apt/sources.list.d/*docker*
sudo rm -f /etc/apt/keyrings/docker.gpg

# Also remove any old docker lines from /etc/apt/sources.list
sudo sed -i '/download\.docker\.com/d' /etc/apt/sources.list

echo "[INFO] Updating package index..."
sudo apt-get update -y

echo "[INFO] Installing dependencies..."
sudo apt-get install -y ca-certificates curl gnupg lsb-release

echo "[INFO] Setting up Docker GPG key..."
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo "[INFO] Adding Docker repository..."
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

echo "[INFO] Installing Docker Engine and plugins..."
sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "[INFO] Enabling and starting Docker service..."
sudo systemctl enable docker
sudo systemctl start docker
# Install Docker Compose v2
COMPOSE_VERSION="v2.29.7"

echo "Installing Docker Compose ${COMPOSE_VERSION}..."
sudo curl -L "https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" \
    -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

echo "[SUCCESS] Docker installation completed!"
docker --version
docker compose version
