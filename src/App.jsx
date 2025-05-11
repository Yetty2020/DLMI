import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { format, differenceInDays, parseISO } from "date-fns";

const sampleDrivers = [
  { id: 1, name: "Yakubu I.", licenseExpiry: "2024-12-25", Rank: "MWO", Deployment: "CDI's Office", LicenseNo: "ABC59704AD38", IssuanceDate: "2021-02-03", SvcNo: "95NA/404992"  },
  { id: 2, name: "Mohammed N.", licenseExpiry: "2028-10-12", Rank: "WO", Deployment: "MT SGT", LicenseNo: "ENU05496AA01", IssuanceDate: "2023-05-22", SvcNo: "96NA/91/4336" },
  { id: 3, name: "Hyelaidaiti N.", licenseExpiry: "2025-10-11", Rank: "WO", Deployment: "MT Yard", LicenseNo: "BNG33284AA02", IssuanceDate: "2023-01-07", SvcNo: "96NA/42/5862" },
  { id: 4, name: "Taminu C", licenseExpiry: "2026-08-13", Rank: "WO", Deployment: "MT Yard", LicenseNo: "ABC59704AD38", IssuanceDate: "2021-01-13", SvcNo: "97NA/44/4280" },
  { id: 5, name: "Yakubu A", licenseExpiry: "2025-06-10",  Rank: "SSgt", Deployment: "DOPs DVR", LicenseNo: "ABC59704AD38", IssuanceDate: "2022-06-20", SvcNo: "97NA/44/4280" },
  { id: 6, name: "Bio L", licenseExpiry: "2028-03-05",  Rank: "SSgt", Deployment: "IMC", LicenseNo: "ABC59704AD38", IssuanceDate: "2023-10-23", SvcNo: "98NA/46/2074" },
  { id: 7, name: "Ayinde T", licenseExpiry: "2026-12-12",  Rank: "SSgt", Deployment: "DCDI's Office", LicenseNo: "ABC59704AD38", IssuanceDate: "2021-03-17", SvcNo: "01NA/50/658" },
  { id: 8, name: "Salisu S", licenseExpiry: "2025-06-10",  Rank: "SSgt", Deployment: "CDI DVR", LicenseNo: "ABC59704AD38", IssuanceDate: "2021-02-09", SvcNo: "02NA/52/5267" },
  { id: 9, name: "Ibrahim K", licenseExpiry: "2028-10-01",  Rank: "POMTD", Deployment: "DFA", LicenseNo: "ABC59704AD38", IssuanceDate: "2023-09-12", SvcNo: "X10351" },
  { id: 10, name: "Alex K", licenseExpiry: "2028-03-30",  Rank: "SSgt", Deployment: "CDI Wife", LicenseNo: "ABC59704AD38", IssuanceDate: "2024-05-27", SvcNo: "03NA/54/4766" },
  { id: 11, name: "Ahmed Ovosi", licenseExpiry: "2025-06-13",  Rank: "DIO III", Deployment: "MT Yard", LicenseNo: "KRV16343AA57", IssuanceDate: "2021-02-24", SvcNo: "DIA/J92/178" },
  { id: 12, name: "Balogun Tajudeen", licenseExpiry: "2025-05-12",  Rank: "DIO III", Deployment: "MT Yard", LicenseNo: "ABC25317AB03", IssuanceDate: "2023-11-07", SvcNo: "DIA/J92/194" },
  { id: 13, name: "Michael Sule", licenseExpiry: "2025-05-19",  Rank: "DIO III", Deployment: "DD Budget", LicenseNo: "ABC77394AD38", IssuanceDate: "2021-02-17", SvcNo: "DIA/J10/540" },
  { id: 14, name: "Rufai AA", licenseExpiry: "2025-05-19",  Rank: "DIO III", Deployment: "D Legal", LicenseNo: "ABC02528AA02", IssuanceDate: "2023-08-25", SvcNo: "DIA/J10/536" },
  { id: 15, name: "Dahiru H", licenseExpiry: "2025-05-19",  Rank: "ADIO", Deployment: "DFA", LicenseNo: "LFA36116AA1", IssuanceDate: "2022-07-20", SvcNo: "DIA/J10/536" },
  { id: 16, name: "Precious CA", licenseExpiry: "2025-05-19",  Rank: "ADIO", Deployment: "DMS", LicenseNo: "ABC67017AB02", IssuanceDate: "2023-12-11", SvcNo: "DIA/J13/639" },
  { id: 17, name: "Sheidu A", licenseExpiry: "2025-06-13",  Rank: "ADIO", Deployment: "DMS", LicenseNo: "ABC27593AD03", IssuanceDate: "2023-05-27", SvcNo: "DIA/J14/652" },
  { id: 18, name: "Tanko I", licenseExpiry: "2025-05-27",  Rank: "CODI", Deployment: "DMS", LicenseNo: "KLT01536AA95", IssuanceDate: "2023-08-01", SvcNo: "DIA/J20/1010" },
  { id: 19, name: "Ponfa N", licenseExpiry: "2025-06-13",  Rank: "CODI", Deployment: "MT Yard", LicenseNo: "ABC24287AB28", IssuanceDate: "2023-07-17", SvcNo: "DIA/J21/1079" },
  { id: 20, name: "Hamza A", licenseExpiry: "2025-05-12",  Rank: "CODI", Deployment: "MT Yard", LicenseNo: "ABC89686AD84", IssuanceDate: "2024-04-08", SvcNo: "DIA/J21/1082" },



 
];

const getAlertLevel = (daysLeft) => {
  if (daysLeft <= 5) return "red";
  if (daysLeft <= 10) return "orange";
  if (daysLeft <= 30) return "yellow";
  return null;
};

export default function DriverLicenseMonitor() {
  const [drivers, setDrivers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const updatedDrivers = sampleDrivers.map((driver) => {
      const issuanceDate = parseISO(driver.IssuanceDate);
      const expiryDate = parseISO(driver.licenseExpiry);
      const today = new Date();

      const totalValidityDays = differenceInDays(expiryDate, issuanceDate);
      const daysLeft = differenceInDays(expiryDate, today);
      const progressPercentage = ((totalValidityDays - daysLeft) / totalValidityDays) * 100;

      return {
        ...driver,
        daysLeft,
        alertLevel: getAlertLevel(daysLeft),
        progressPercentage: Math.max(0, Math.min(progressPercentage, 100)),
      };
    });
    setDrivers(updatedDrivers);
  }, []);

  const renderAlert = (driver) => {
    const { alertLevel, daysLeft } = driver;
    if (!alertLevel) return null;
    let message = "";
    if (alertLevel === "yellow") message = `License expires in ${daysLeft} days.`;
    if (alertLevel === "orange") message = `URGENT: License expires in ${daysLeft} days.`;
    if (alertLevel === "red") message = `RENEW LICENSE IMMEDIATELY - ${daysLeft} days left!`;
    return <p className={`text-${alertLevel}-500 font-semibold`}>{message}</p>;
  };

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || driver.alertLevel === filter;
    return matchesSearch && matchesFilter;
  });

  // const getDaysRemaining = (expiryDate) => {
  //   const today = new Date();
  //   const expiry = new Date(expiryDate);
  //   const diffTime = expiry.getTime() - today.getTime();
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //   return diffDays;
  // };

  return (
    <div className="p-6 space-y-6">
      <div className="flex gap-x-4 items-center ">
        <img className=" rounded-full w-[8%]" src="https://media.licdn.com/dms/image/v2/D4E22AQFSSnN-YOoCHA/feedshare-shrink_800/feedshare-shrink_800/0/1710951284639?e=2147483647&v=beta&t=G9ExVYnV-bThZsdIF_8Rg_-Wi7nScbiuLYM8sfgeM7w" alt="driver"/>
        <h1 className="text-2xl font-bold mb-4">DOL - Drivers License Monitoring App (DLMA)</h1>
      </div>

      {/* search and filter */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder= "Search by name"
        className="border px-2 py-1 rounded mr-2"
      />

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="all">All</option>
        <option value="yellow">Expiring in 30 days</option>
        <option value="orange">Expiring in 10 days</option>
        <option value="red">Expiring in 5 days</option>
      </select>

      {filteredDrivers.map((driver) => (
        <Card key={driver.id} className="shadow-lg">
          <CardContent className="space-y-2 p-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-y-4">
                <h2 className="text-lg font-bold">{driver.Rank} {driver.name}</h2>
                <p>Service Number: {driver.SvcNo}</p>
                <p>License Number: {driver.LicenseNo}</p>
                <p>Deployment: {driver.Deployment}</p>
                <p>Issuance Date: {format(parseISO(driver.IssuanceDate), "yyyy-MM-dd")}</p>
                <p>License Expiry: {format(parseISO(driver.licenseExpiry), "yyyy-MM-dd")}</p>
                {renderAlert(driver)}
                <div className="mt-2">
                  <Progress value={driver.progressPercentage} />
                  <p className="text-sm text-gray-600 mt-1">
                    {driver.daysLeft} day{driver.daysLeft !== 1 ? 's' : ''} remaining
                  </p>
                </div>
              </div>
              {driver.alertLevel === "red" && (
                <Button className="bg-red-500">
                  <a href="https://www.nigeriadriverslicence.org/">Renew</a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
