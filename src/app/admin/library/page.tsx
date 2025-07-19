"use client";
import React, { useState, useMemo, useEffect } from "react";
import LibraryList from "./LibraryList";
import LibraryModal from "./LibraryModal";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import type { LibraryItem } from "./LibraryCard";

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<LibraryItem | null>(null);
  const [data, setData] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/library")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const uniqueTypes = useMemo(() => Array.from(new Set(data.map((item) => item.type))), [data]);
  const uniqueStatus = useMemo(() => Array.from(new Set(data.map((item) => item.status))), [data]);

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.header.toLowerCase().includes(search.toLowerCase()) ||
        item.reviewer.toLowerCase().includes(search.toLowerCase());
      const matchesType = type !== "all" ? item.type === type : true;
      const matchesStatus = status !== "all" ? item.status === status : true;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [search, type, status, data]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-destructive">{error}</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <Input
          placeholder="Search by header or reviewer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-1/3"
        />
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {uniqueTypes.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {uniqueStatus.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <LibraryList
        data={filtered}
        onView={(item) => {
          setSelected(item);
          setModalOpen(true);
        }}
      />
      <LibraryModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        item={selected}
        onEdit={(updated) => {
          setSelected(updated);
        }}
        onDelete={() => {
          setModalOpen(false);
        }}
      />
    </div>
  );
} 