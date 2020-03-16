export default function(start_date, end_date, canceled_at) {
  if (!canceled_at) return ['#F7AFAF', 'Cancelado'];
  if (!start_date) return ['#F0F0DF', 'Pendente'];
  if (start_date) return ['#BAD2FD', 'Retirada'];
  if (end_date) return ['#DFF0DF', 'Entregue'];

  return '#F0F0DF';
}
