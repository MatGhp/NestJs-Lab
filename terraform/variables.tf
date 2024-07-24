# variables.tf

variable "prefix" {
  description = "Prefix for resource names."
  default     = "eventhublab"
}

variable "environment" {
  description = "Deployment environment (e.g., dev, prod)."
  default     = "dev"
}

variable "location" {
  description = "Azure region for resource deployment."
  default     = "West Europe"
}

# Event Hub Namespace settings
variable "eventhub_namespace_name" {
  description = "Name of the Event Hub namespace."
  default     = "eventhub-namespace"
}

variable "eventhub_name" {
  description = "Name of the Event Hub."
  default     = "eventhub"
}

variable "authorization_rule_name" {
  description = "Name of the Event Hub authorization rule."
  default     = "eventhub-auth-rule"
}

# Storage Account settings
variable "storage_account_tier" {
  description = "The performance tier of the storage account."
  default     = "Standard"
}

variable "storage_account_replication" {
  description = "The replication strategy for the storage account."
  default     = "LRS"
}

variable "storage_container_name" {
  description = "The name of the storage container."
  default     = "container-eventhub"
}

variable "subscription_id" {
  description = "Azure subscription ID."
  type        = string
}

variable "tenant_id" {
  description = "Azure tenant ID."
  type        = string
}

variable "client_id" {
  description = "Azure client ID."
  type        = string
}

variable "client_secret" {
  description = "Azure client secret."
  type        = string
  sensitive   = true
}
