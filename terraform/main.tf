# main.tf
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
  }
}

provider "azurerm" {
  features {}

  subscription_id = var.subscription_id
  tenant_id       = var.tenant_id
  client_id       = var.client_id
  client_secret   = var.client_secret
}

# Create a Resource Group
resource "azurerm_resource_group" "main" {
  name     = "${var.prefix}-${var.environment}-rg"
  location = var.location
}

# Create an Event Hub Namespace
resource "azurerm_eventhub_namespace" "main" {
  name                = "${var.prefix}-${var.environment}-${var.eventhub_namespace_name}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku                 = "Basic"  # Minimum cost tier
  capacity            = 1
}

# Create an Event Hub
resource "azurerm_eventhub" "main" {
  name                = "${var.prefix}-${var.environment}-${var.eventhub_name}"
  namespace_name      = azurerm_eventhub_namespace.main.name
  resource_group_name = azurerm_resource_group.main.name
  partition_count     = 2
  message_retention   = 1
}

# Create an Authorization Rule
resource "azurerm_eventhub_authorization_rule" "main" {
  name                = "${var.prefix}-${var.environment}-${var.authorization_rule_name}"
  namespace_name      = azurerm_eventhub_namespace.main.name
  eventhub_name       = azurerm_eventhub.main.name
  resource_group_name = azurerm_resource_group.main.name
  listen              = true
  send                = true
  manage              = true
}

# Output the connection string
output "namespace_connection_string" {
  value     = azurerm_eventhub_namespace.main.default_primary_connection_string
  sensitive = true
}

# Output the Event Hub name
output "eventhub_name" {
  value = azurerm_eventhub.main.name
}
