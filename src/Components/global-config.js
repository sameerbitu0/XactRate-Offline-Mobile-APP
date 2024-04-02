const URL_CONFIG = {
  /**
   * live Api Url
   */
  //Url: 'http://192.168.100.20:1000/',

  Url: 'https://xr.logoflex.co.uk/',
  dashboard_api: 'api/dashboard',
  schedules_api: 'api/all_schedule_tickets',
  clients_api: 'api/all_clients',
  tickets_api: 'api/tickets',
  schedule_tickets_api: 'api/all_tickets?status=schedule',
  close_tickets_api: 'api/all_tickets?status=closed',
  suspend_tickets_api: 'api/all_tickets?status=suspend',
  decline_tickets_api: 'api/all_tickets?status=decline',
  all_tickets_api: 'api/all_tickets?status=all',
  tickets_types_api: 'api/tickets/types',
  tickets_save_api: 'api/tickets/save',
  tickets_bulk_save_api: 'api/tickets/bulk_save',
  tickets_delete_api: 'api/tickets/delete/',
  catalogs_api: 'api/catalogs?page=1',
  categories_api: 'api/catalog/categories?id=1&page=1',
  products_api: 'api/catalog/product?catalog_id=5&catalog_category_id=4&page=1',
  employees_api: 'api/employees?page=1',
  service_agreement_api: 'api/service_agreement',
  warranty_percentage_api: 'api/metrics/settings',
  invoices_save_api: 'api/invoices/save',
  invoices_bulk_save_api: 'api/invoices/bulk_save',
  bulk_ticket_invoice_store_api: 'api/bulk_ticket_invoice_store',
  logout_api: 'api/logout',
};

export default URL_CONFIG;
