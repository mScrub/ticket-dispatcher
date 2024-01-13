import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label, ResponsiveContainer, Legend } from "recharts"
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { mockTicketData } from "../data/mockData";
import { filterTicketData } from "../utilities/ticketFunctions";
// import Header from "./Header";


// Ceiling of line chart
interface CeilingProps {
    YCeiling: number;
}
const YCeiling = 52;

export default function QuoteCostPage() {
    const finalTicketResult = filterTicketData(mockTicketData);

    const Item = styled(Paper)(({ theme }) => ({
        width: 140,
        height: 80,
        padding: theme.spacing(2),
        borderRadius: 3,
        ...theme.typography.body2,
        backgroundColor: '#348c75',
        textAlign: 'center',
        fontFamily: 'Source Sans Pro,sans-serif',
        fontWeight: 500,
        fontSize: '14px',
        opacity: '90%',
    }));

    const boxStyles = {
        p: 2,
        borderRadius: 24,
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
    }

    const ceilingProps: CeilingProps = { YCeiling };
    return (<>
        <Box m='20px'>
            <Header title="QUOTE / COST" subtitle="Welcome to the quote cost visualization page"/> 
            <Box height='75vh' display="flex" flexDirection="column" alignItems="center">
                <div style={{ display: "flex" }}>
                    <React.Fragment>
                        <Box
                            sx={boxStyles}
                        >
                            <Item elevation={3}>
                                <div>{`Total Spent`}</div>
                                {"$" + finalTicketResult!.filteredDataObj.cumulative_costs}
                            </Item>
                        </Box>
                        <Box sx={boxStyles}>
                            <Item elevation={3}>
                                <div>{`Total Savings`}</div>
                                {"$" + finalTicketResult!.filteredDataObj.cumulative_inc_per_mo}
                            </Item>
                        </Box>
                        <Box sx={boxStyles}>
                            <Item elevation={3}>
                                <div>{`Saving Rate`}</div>
                                {"$" + finalTicketResult!.summedSavings + ".00/month"}
                            </Item>
                        </Box>
                        <Box sx={boxStyles}>
                            <Item elevation={3}>
                                <div>{`Tickets Paid`}</div>
                                {finalTicketResult!.ticketsPaid}
                            </Item>
                        </Box>
                        <Box sx={boxStyles}>
                            <Item elevation={3}>
                                <div>{`Break Even`}</div>
                                {finalTicketResult!.breakEven + " months"}
                            </Item>
                        </Box>
                    </React.Fragment>
                </div>
                <Typography
                    variant="h2"
                    color='#3da58a'
                    fontWeight="bold"
                    textAlign='center'
                    sx={{ m: "0 0 5px 0" }}>Quote Cost Visualization</Typography>
                <ResponsiveContainer width='100%' height="80%">
                    <LineChart width={600} height={300} data={mockTicketData}>
                        <Line type="step" dot={false} strokeWidth={3} dataKey="cumulative_costs" stroke="#ff0000" />
                        <Line type="monotone" dot={false} strokeWidth={3} dataKey="cumulative_total_up_to_mo" stroke="#1fc700" />
                        <CartesianGrid fillOpacity={0.1} fill='#3da58a' strokeDasharray="1 2" />
                        <XAxis dataKey="date_of_completion" stroke="#3da58a">
                            <Label value="Month of the Year" offset={-4} position="insideBottom" fill='#3da58a' />
                        </XAxis>
                        <YAxis stroke="#3da58a" strokeWidth={1} label={{ value: '$ Cost / Savings', angle: -90, position: 'insideLeft', offset: 24, fill: "#3da58a" }} domain={[0, Math.ceil(ceilingProps.YCeiling / 10) * 10]} />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    </>)
}