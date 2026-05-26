export function eventBadgeColor(type) {
  switch (type) {
    case "LOGIN":            return "bg-green-900 text-green-300";
    case "LOGOUT":           return "bg-blue-900 text-blue-300";
    case "LOGIN_FAILED":     return "bg-red-900 text-red-300";
    case "FILE_ACCESS":      return "bg-yellow-900 text-yellow-300";
    case "FILE_DELETED":     return "bg-pink-900 text-pink-300";
    case "PERMISSION_DENIED":return "bg-orange-900 text-orange-300";
    default:                 return "bg-indigo-900 text-indigo-300";
  }
}
