import { m } from '~/paraglide/messages'
import { appVersion, buildTime } from '~/version' with { type: 'macro' }

export function AppInfo() {
  return (
    <div className="text-muted-foreground p-4 text-sm">
      <p>{m.version({ version: appVersion })}</p>
      <p>{m.updated_at({ updatedAt: buildTime })}</p>
    </div>
  )
}
