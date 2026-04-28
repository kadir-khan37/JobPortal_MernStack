import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { FiEdit } from "react-icons/fi";
import { Avatar, AvatarImage } from "../components/ui/avatar.jsx";
import { useSelector } from "react-redux";
import useGetAllCompanies from "../hooks/UseGetAllCompanies";
import { useNavigate } from "react-router-dom";

const CompaniesTable = ({ search }) => {
  const user = useSelector((state) => state.auth.user);
  useGetAllCompanies(user);

  const companies = useSelector(
    (state) => state.company.companies
  ) || [];

  const navigate = useNavigate();

  const normalizedSearch = (search || "").trim().toLowerCase();

  const filteredCompanies =
    normalizedSearch === ""
      ? companies
      : companies.filter((c) => {
          const name = (c.name || "").toLowerCase();
          const website = (c.website || "").toLowerCase();
          const location = (c.location || "").toLowerCase();

          return (
            name.includes(normalizedSearch) ||
            website.includes(normalizedSearch) ||
            location.includes(normalizedSearch)
          );
        });

  return (
    <div>
      <Table>
        <TableCaption>Your companies</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredCompanies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No companies created yet.
              </TableCell>
            </TableRow>
          ) : (
            filteredCompanies.map((company) => (
              <TableRow key={company._id || company.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      className="w-12 h-12 rounded-full object-cover"
                      src={company.logo || ""}
                      alt={company.name || "company logo"}
                    />
                  </Avatar>
                </TableCell>

                <TableCell>{company.name}</TableCell>
                <TableCell>{company.website || "—"}</TableCell>
                <TableCell>{company.location || "—"}</TableCell>
                <TableCell>
                  {company.createdAt
                    ? new Date(company.createdAt).toLocaleDateString()
                    : "—"}
                </TableCell>

                <TableCell>
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/admin/companies/${company._id}`)
                    }
                  >
                    <FiEdit size={20} />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
