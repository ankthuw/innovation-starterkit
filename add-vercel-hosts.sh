#!/bin/bash
# Script to add Vercel and npm domains to /etc/hosts for deployment
# Run with: sudo bash add-vercel-hosts.sh

# Backup hosts file
sudo cp /etc/hosts /etc/hosts.backup-$(date +%Y%m%d)

# Remove old entries if they exist
sudo sed -i '/vercel\.com/d' /etc/hosts
sudo sed -i '/vercel\.sh/d' /etc/hosts
sudo sed -i '/registry\.npmjs\.org/d' /etc/hosts

# Add new entries
echo "Adding deployment domains to /etc/hosts..."
sudo tee -a /etc/hosts > /dev/null << 'EOF'

# Vercel deployment domains
198.169.2.65 vercel.com
198.169.1.129 vercel.com
64.239.109.129 vercel.sh
64.239.123.65 vercel.sh

# npm registry
104.16.3.34 registry.npmjs.org
104.16.6.34 registry.npmjs.org
104.16.8.34 registry.npmjs.org
104.16.9.34 registry.npmjs.org
EOF

echo "Done! Domains added to /etc/hosts"
echo "Backup saved at /etc/hosts.backup-$(date +%Y%m%d)"
echo ""
echo "Verifying entries:"
grep -E "vercel|registry.npmjs" /etc/hosts
