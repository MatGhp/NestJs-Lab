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
  sku                 = "Basic" # Minimum cost tier
  capacity            = 1
}

# Create an Event Hub
resource "azurerm_eventhub" "main" {
  name                = "${var.prefix}-${var.environment}-${var.eventhub_name}"
  namespace_name      = azurerm_eventhub_namespace.main.name
  resource_group_name = azurerm_resource_group.main.name
  partition_count     = 2
  message_retention   = 1 # Minimum retention period
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

# Create the first Consumer Group named 'job1'
resource "azurerm_eventhub_consumer_group" "job1" {
  name                = "job1"
  eventhub_name       = azurerm_eventhub.main.name
  namespace_name      = azurerm_eventhub_namespace.main.name
  resource_group_name = azurerm_resource_group.main.name
}

# Create the second Consumer Group named 'job2'
resource "azurerm_eventhub_consumer_group" "job2" {
  name                = "job2"
  eventhub_name       = azurerm_eventhub.main.name
  namespace_name      = azurerm_eventhub_namespace.main.name
  resource_group_name = azurerm_resource_group.main.name
}

# Create a Storage Account
resource "azurerm_storage_account" "main" {
  name                     = "${var.prefix}${var.environment}sa"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = var.storage_account_tier
  account_replication_type = var.storage_account_replication

  tags = {
    environment = var.environment
  }
}

# Create a Storage Container
resource "azurerm_storage_container" "main" {
  name                  = var.storage_container_name
  storage_account_name  = azurerm_storage_account.main.name
  container_access_type = "private"
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

# Output the Storage Account name
output "storage_account_name" {
  value = azurerm_storage_account.main.name
}

# Output the Storage Container name
output "storage_container_name" {
  value = azurerm_storage_container.main.name
}

# Output Consumer Group names
output "consumer_group_1" {
  value = azurerm_eventhub_consumer_group.job1.name
}

output "consumer_group_2" {
  value = azurerm_eventhub_consumer_group.job2.name
}
