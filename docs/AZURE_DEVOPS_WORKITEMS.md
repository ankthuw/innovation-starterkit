# Azure DevOps Work Items Guide

This guide explains how to fetch and work with Azure DevOps work items for the Innovation Starter Kit project.

## Project Information

- **Organization**: `BDC-RBVH-ETM`
- **Project**: `digi-easy`
- **Repository**: `de_innovation_starter_kit`
- **Innovation Area Path**: `digi-easy\INNO`

## Azure CLI Setup

### Install Azure CLI

```bash
# On Linux/macOS
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Or use package manager
# macOS with Homebrew
brew install azure-cli

# Linux with apt
az afd install

# Windows with winget
winget install Microsoft.AzureCLI
```

### Authenticate

```bash
az login
```

### Set Default Organization and Project

```bash
az devops configure --organization https://dev.azure.com/BDC-RBVH-ETM --project digi-easy
```

## M1 Mock UI Tasks CSV

For Milestone 1 (M1) prototype tasks, see the detailed breakdown in:
**[M1_MOCK_UI_TASKS.csv](./M1_MOCK_UI_TASKS.csv)**

This CSV includes:
- Work item ID and title
- Implementation status vs what already exists
- Specific mock UI tasks to create for demonstration
- Component file locations
- Page/feature locations
- Notes on what needs to be built

## Fetching Work Items for M1 Scope

### Method 1: Using Azure CLI with WIQL Query

```bash
az boards query --org https://dev.azure.com/BDC-RBVH-ETM \
  --project digi-easy \
  --wiql "
  SELECT [System.Id], [System.WorkItemType], [System.Title], [System.State], [System.AssignedTo], [System.Tags]
  FROM WorkItems
  WHERE [System.AreaPath] UNDER 'digi-easy\\INNO'
  ORDER BY [System.Id] DESC"
```

### Method 2: Using Azure DevOps MCP Tools

If you have access to MCP (Model Context Protocol) tools, you can use:

```typescript
// Get work items by area path using MCP
const workItems = await mcp_azure_devops__wit_get_query_results_by_id({
  id: "query-id",
  project: "digi-easy"
});
```

### Method 3: Direct API Call

```bash
# Get work items by area path using REST API
az rest --method post \
  --uri "https://dev.azure.com/BDC-RBVH-ETM/digi-easy/_apis/wit/wiql?api-version=7.1" \
  --body '{
    "query": "SELECT [System.Id], [System.WorkItemType], [System.Title], [System.State], [System.AssignedTo], [System.Tags] FROM WorkItems WHERE [System.AreaPath] UNDER '\''digi-easy\\INNO'\'' ORDER BY [System.Id] DESC"
  }'
```

## Current Work Items in `digi-easy\INNO`

### Summary

| Type | Count |
|------|-------|
| Epics | 3 |
| Features | 2 |
| User Stories | 17 |
| **Total** | **22** |

### Epics

| ID | Title | State |
|----|-------|-------|
| 4401 | Innovation StarterKit Prototype | New |
| 4402 | UIUX Branding | New |
| 4405 | Miminal Viable Product | New |

### Features

| ID | Title | State |
|----|-------|-------|
| 4403 | StarterKit styleguide | New |
| 4406 | Development environment setup | New |

### Key User Stories

| ID | Title | Tags | State |
|----|-------|------|-------|
| 4547 | Story 01.3: Campaign Context Integration | Campaign; Context; Dev | New |
| 4548 | Story 09.1: Professional Pitch Deck Design | Critical; Design; Pitch; Prototype; UX | New |
| 4549 | Story 01.1: Real-time Idea Validation | FullStack; M1; UX; Validation | New |
| 4550 | Story 09.2: Enhanced PDF Export Formatting | Critical; Dev; Export; M1; PDF; Prototype | New |
| 4556 | Story 02.1: AI Idea Scoring | AI; Demo; FullStack; M1; Scoring | New |
| 4557 | Story 02.2: AI Co-Innovator Persona | AI; Chatbot; FullStack; M1; Persona | New |
| 4560 | Story 05.1: Analytics Dashboard (Simplified) | Analytics; Charts; Dashboard; FullStack; M1 | New |

## Linking Commits to Work Items

### Using Git Commit Messages

Add work item ID to your commit message to automatically link it:

```bash
# Format: #ID or #ID, #ID2
git commit -m "feat: add campaign context mode selection

Implement campaign context selection modal for the Innovation Kit.
Addresses campaign-tailored AI vs Standard AI options.

#4547"
```

### Using Azure DevOps CLI

```bash
# Add a PR link to work item
az boards work-item relation add \
  --org https://dev.azure.com/BDC-RBVH-ETM \
  --project digi-easy \
  --id 4547 \
  --relation-type "artifact" \
  --target-url "https://dev.azure.com/BDC-RBVH-ETM/digi-easy/_git/de_innovation_starter_kit/pullrequest/1"
```

## Useful Queries

### Get All Work Items in INNO Area

```bash
az boards query --org https://dev.azure.com/BDC-RBVH-ETM \
  --project digi-easy \
  --wiql "SELECT [System.Id], [System.WorkItemType], [System.Title], [System.State] FROM WorkItems WHERE [System.AreaPath] = 'digi-easy\\INNO'"
```

### Get Only User Stories

```bash
az boards query --org https://dev.azure.com/BDC-RBVH-ETM \
  --project digi-easy \
  --wiql "SELECT [System.Id], [System.Title], [System.State], [System.Tags] FROM WorkItems WHERE [System.AreaPath] = 'digi-easy\\INNO' AND [System.WorkItemType] = 'User Story'"
```

### Get New Work Items

```bash
az boards query --org https://dev.azure.com/BDC-RBVH-ETM \
  --project digi-easy \
  --wiql "SELECT [System.Id], [System.Title], [System.Tags] FROM WorkItems WHERE [System.AreaPath] = 'digi-easy\\INNO' AND [System.State] = 'New'"
```

## Work Item Web URLs

Direct links to work items:
```
https://dev.azure.com/BDC-RBVH-ETM/ec5c8f03-c193-4a90-92a2-7c8eb2ce3eb9/_workitems/edit/{ID}
```

Example for Campaign Context Integration (4547):
```
https://dev.azure.com/BDC-RBVH-ETM/ec5c8f03-c193-4a90-92a2-7c8eb2ce3eb9/_workitems/edit/4547
```

## References

- [Azure Boards CLI Documentation](https://learn.microsoft.com/en-us/cli/azure/devops/)
- [WIQL Syntax Reference](https://learn.microsoft.com/en-us/azure/devops/boards/queries/wiql-syntax)
- [Azure DevOps REST API](https://learn.microsoft.com/en-us/rest/api/azure/devops/)
