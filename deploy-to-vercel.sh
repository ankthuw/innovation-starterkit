#!/bin/bash
# Script to deploy to Vercel WITHOUT proxy
# Run this script directly in your terminal

# Explicitly clear ALL proxy environment variables
unset http_proxy
unset https_proxy
unset HTTP_PROXY
unset HTTPS_PROXY
unset ftp_proxy
unset FTP_PROXY
unset no_proxy
unset NO_PROXY
unset NODE_TLS_REJECT_UNAUTHORIZED

echo "=========================================="
echo "Vercel Deployment Script"
echo "(Proxy disabled)"
echo "=========================================="
echo ""

echo "Checking network connectivity..."
echo "1. DNS Test:"
nslookup vercel.com 2>&1 | grep -E "Address:|Name:" | head -3
echo ""
echo "2. No proxy variables set:"
env | grep -i proxy || echo "  ✓ No proxy environment variables found"
echo ""

echo "Step 1: Login to Vercel"
echo "This will open your browser for authentication"
echo ""

vercel login

echo ""
echo "Step 2: Link project to Vercel"
echo ""

vercel link

echo ""
echo "Step 3: Deploy to production"
echo ""

vercel --prod

echo ""
echo "Deployment complete!"
echo ""
