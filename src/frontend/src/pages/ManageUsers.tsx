import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, ShieldCheck, UserPlus, Users, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateUser, useUsers } from "../hooks/useBackend";
import { formatDate, getRoleBadgeColor } from "../lib/utils";
import type { UserRoleStr } from "../types";

const ROLE_OPTIONS: { value: UserRoleStr; label: string }[] = [
  { value: "doctor", label: "Doctor" },
  { value: "volunteer", label: "Volunteer" },
  { value: "admin", label: "Admin" },
];

const ROLE_ICONS: Record<UserRoleStr, string> = {
  doctor: "🩺",
  volunteer: "🤝",
  admin: "🛡️",
  patient: "🏥",
};

type FormState = {
  name: string;
  email: string;
  role: UserRoleStr;
};

const EMPTY_FORM: FormState = { name: "", email: "", role: "volunteer" };

export default function ManageUsers() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const { data: users = [], isLoading } = useUsers();
  const createUser = useCreateUser();

  function handleField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    try {
      await createUser.mutateAsync({
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
      });
      toast.success(`User "${form.name}" added successfully.`);
      setForm(EMPTY_FORM);
      setShowForm(false);
    } catch {
      toast.error("Failed to create user. Please try again.");
    }
  }

  const roleCounts = users.reduce<Record<string, number>>((acc, u) => {
    acc[u.role] = (acc[u.role] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="page-enter space-y-6">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold text-foreground">
            Manage Users
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {users.length} registered user{users.length !== 1 ? "s" : ""} on the
            platform
          </p>
        </div>
        <Button
          data-ocid="toggle-add-user"
          onClick={() => setShowForm((v) => !v)}
          variant={showForm ? "outline" : "default"}
          className="gap-2"
        >
          {showForm ? (
            <>
              <X className="h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              Add New User
            </>
          )}
        </Button>
      </div>

      {/* Summary stat cards */}
      <div className="grid grid-cols-3 gap-4">
        {ROLE_OPTIONS.map(({ value, label }) => (
          <Card key={value} className="border-border">
            <CardContent className="pt-4 pb-4 flex items-center gap-3">
              <span className="text-2xl">{ROLE_ICONS[value]}</span>
              <div>
                <p className="text-xl font-semibold text-foreground">
                  {roleCounts[value] ?? 0}
                </p>
                <p className="text-xs text-muted-foreground">{label}s</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add User Form */}
      {showForm && (
        <Card
          className="border-border shadow-sm animate-in fade-in slide-in-from-top-2 duration-200"
          data-ocid="add-user-form"
        >
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              New User Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label htmlFor="user-name">Full Name</Label>
                  <Input
                    id="user-name"
                    data-ocid="input-user-name"
                    placeholder="Dr. Priya Sharma"
                    value={form.name}
                    onChange={(e) => handleField("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="user-email">Email Address</Label>
                  <Input
                    id="user-email"
                    data-ocid="input-user-email"
                    type="email"
                    placeholder="priya@carebridge.com"
                    value={form.email}
                    onChange={(e) => handleField("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="user-role">Role</Label>
                  <Select
                    value={form.role}
                    onValueChange={(v) => handleField("role", v)}
                  >
                    <SelectTrigger id="user-role" data-ocid="select-user-role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLE_OPTIONS.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {ROLE_ICONS[value]} {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-5 pt-4 border-t border-border">
                <Button
                  type="submit"
                  data-ocid="submit-add-user"
                  disabled={
                    createUser.isPending ||
                    !form.name.trim() ||
                    !form.email.trim()
                  }
                  className="gap-2 min-w-[130px]"
                >
                  {createUser.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating…
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" />
                      Create User
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Users Table */}
      <Card className="border-border shadow-sm" data-ocid="users-table-card">
        <CardHeader className="pb-3 border-b border-border">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            All Users
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3" data-ocid="users-loading">
              {(["a", "b", "c", "d"] as const).map((k) => (
                <div key={k} className="flex items-center gap-4">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-56" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          ) : users.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="users-empty"
            >
              <Users className="h-10 w-10 text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground font-medium">No users yet</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Click "Add New User" to register the first team member.
              </p>
            </div>
          ) : (
            <Table data-ocid="users-table">
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="w-[40%]">Name</TableHead>
                  <TableHead className="w-[30%]">Email</TableHead>
                  <TableHead className="w-[15%]">Role</TableHead>
                  <TableHead className="w-[15%] text-right">Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-muted/20 transition-colors"
                    data-ocid={`user-row-${user.id}`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary flex-shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-foreground truncate">
                          {user.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs font-medium capitalize ${getRoleBadgeColor(user.role)}`}
                        data-ocid={`role-badge-${user.id}`}
                      >
                        {ROLE_ICONS[user.role as UserRoleStr] ?? ""} {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
