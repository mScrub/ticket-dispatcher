export function filterTicketData(ticket_data: any) {
    let tickets_paid = 0;
    let sum_savings_per_mo = 0;
    let break_even_point = 0;
    const filteredData = ticket_data.filter((eachRow: { ticket_id: number; cumulative_costs: string; savings_per_month: string; cumulative_inc_per_mo: string; cumulative_total_up_to_mo: string; }) => {
        if (eachRow.ticket_id) {
            Math.max(parseInt(eachRow.cumulative_costs)
                && (ticket_data[ticket_data.length - 1].cumulative_costs !== eachRow.cumulative_costs ? tickets_paid += 1 : tickets_paid += 0)
                && (sum_savings_per_mo = parseInt(eachRow.savings_per_month) * (tickets_paid + 1))
                && (eachRow.cumulative_costs === eachRow.cumulative_total_up_to_mo ? break_even_point = eachRow.ticket_id : 0)
                && (Math.max(parseInt(eachRow.cumulative_inc_per_mo))))
            return true;
        };
        return false;
    })

    if (filteredData.length > 0) {
        return { filteredDataObj: filteredData[filteredData.length - 1], summedSavings: sum_savings_per_mo, ticketsPaid: tickets_paid + 1, breakEven: break_even_point };
    } else {
        return null;
    }
}
