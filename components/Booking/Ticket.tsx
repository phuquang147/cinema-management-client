import { useEffect, useState } from "react";
import { SEAT_TYPES } from "~/constants";
import { ITicket } from "~/interfaces/ticket.interface";

interface TicketProps {
  ticket: ITicket | null;
  selectedTickets: ITicket[];
  selectTicket: (ticket: ITicket, rowIndex: number, colIndex: number) => void;
  unSelectTicket: (ticket: ITicket, rowIndex: number, colIndex: number) => void;
  rowIndex: number;
  colIndex: number;
}

const Ticket: React.FC<TicketProps> = ({
  ticket,
  selectedTickets,
  selectTicket,
  unSelectTicket,
  rowIndex,
  colIndex,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>();

  useEffect(() => {
    if (ticket)
      setIsSelected(
        selectedTickets.findIndex(
          (selectedTicket) => selectedTicket._id === ticket._id
        ) !== -1
      );
  }, [selectedTickets, ticket]);

  if (!ticket)
    return (
      <button
        className="h-9 w-9 rounded bg-[#eee] dark:bg-gray-700 m-1"
        disabled
      ></button>
    );

  const seatType = ticket.ticketId.seat.type;
  const position = ticket.ticketId.seat.position;

  switch (seatType) {
    case SEAT_TYPES.SINGLE:
      return (
        <button
          data-id={ticket.ticketId._id}
          onClick={() => {
            isSelected
              ? unSelectTicket(ticket, rowIndex, colIndex)
              : selectTicket(ticket, rowIndex, colIndex);
          }}
          disabled={ticket.ticketId.isBooked}
          className={`h-9 w-9 rounded m-1 ${
            isSelected ? "bg-primary" : "bg-[#bbb]"
          } ${ticket.ticketId.isBooked ? "booked-seat" : ""}`}
        ></button>
      );

    case SEAT_TYPES.DOUBLE:
      return position === "left" ? (
        <button
          data-id={ticket.ticketId._id}
          onClick={() => {
            isSelected
              ? unSelectTicket(ticket, rowIndex, colIndex)
              : selectTicket(ticket, rowIndex, colIndex);
          }}
          disabled={ticket.ticketId.isBooked}
          className={`h-9 w-20 rounded m-1 ${
            isSelected ? "bg-primary" : "bg-[#bbb]"
          } ${ticket.ticketId.isBooked ? "booked-seat" : ""}`}
        ></button>
      ) : null;
    default:
      return (
        <button
          className="h-9 w-9 rounded bg-[#eee] dark:bg-gray-700 m-1"
          disabled
          data-id={ticket.ticketId._id}
        ></button>
      );
  }
};

export default Ticket;
