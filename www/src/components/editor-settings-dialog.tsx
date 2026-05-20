import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  defaultSettings,
  useEditorSettings,
} from '@/contexts/editor-settings-context';
import { type EditorSyntaxTheme, syntaxThemes } from '@/lib/syntax-themes';
import { RotateCcw, Settings } from 'lucide-react';
import { type ReactNode, useId, useState } from 'react';

const syntaxThemeGroups = Array.from(
  new Set(syntaxThemes.map((theme) => theme.family))
).map((family) => ({
  family,
  themes: syntaxThemes.filter((theme) => theme.family === family),
}));

const editorDefaults = {
  fontSize: defaultSettings.fontSize,
  keybindings: defaultSettings.keybindings,
  lineNumbers: defaultSettings.lineNumbers,
  lineWrapping: defaultSettings.lineWrapping,
  syntaxTheme: defaultSettings.syntaxTheme,
  tabSize: defaultSettings.tabSize,
};

const editorDefaultKeys = Object.keys(editorDefaults) as Array<
  keyof typeof editorDefaults
>;

interface SettingSectionProps {
  children: ReactNode;
  title: string;
}

const SettingSection = ({ children, title }: SettingSectionProps) => (
  <section className='grid gap-3'>
    <h3 className='text-muted-foreground text-xs font-medium'>{title}</h3>
    <div className='grid divide-y rounded-md border'>{children}</div>
  </section>
);

interface SettingRowProps {
  children: ReactNode;
  description: string;
  id: string;
  label: string;
}

const SettingRow = ({ children, description, id, label }: SettingRowProps) => (
  <div className='grid gap-3 p-3 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6'>
    <Label htmlFor={id} className='grid cursor-pointer gap-1'>
      <span className='text-sm font-medium'>{label}</span>
      <span className='text-muted-foreground text-xs font-normal'>
        {description}
      </span>
    </Label>
    {children}
  </div>
);

export const EditorSettingsDialog = () => {
  const { settings, updateSettings } = useEditorSettings();

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  const id = useId();

  const settingsChanged = editorDefaultKeys.some(
    (key) => settings[key] !== editorDefaults[key]
  );

  return (
    <>
      <Button
        variant='ghost'
        size='icon'
        onClick={() => setSettingsOpen(true)}
        title='Settings'
        className='h-7 w-7 cursor-pointer'
      >
        <Settings className='h-4 w-4' />
      </Button>

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className='gap-0 p-0 sm:max-w-[560px]'>
          <DialogHeader>
            <div className='grid gap-2 px-6 pt-6 pb-2'>
              <DialogTitle>Settings</DialogTitle>
              <DialogDescription>
                Customize your editor experience with these settings.
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className='grid gap-5 px-6 py-5'>
            <SettingSection title='Display'>
              <SettingRow
                id={`${id}-line-numbers`}
                label='Line numbers'
                description='Show the editor gutter.'
              >
                <Switch
                  id={`${id}-line-numbers`}
                  checked={settings.lineNumbers}
                  onCheckedChange={(checked) =>
                    updateSettings({ lineNumbers: checked })
                  }
                />
              </SettingRow>

              <SettingRow
                id={`${id}-line-wrapping`}
                label='Word wrap'
                description='Wrap long lines inside the editor pane.'
              >
                <Switch
                  id={`${id}-line-wrapping`}
                  checked={settings.lineWrapping}
                  onCheckedChange={(checked) =>
                    updateSettings({ lineWrapping: checked })
                  }
                />
              </SettingRow>
            </SettingSection>

            <SettingSection title='Editing'>
              <SettingRow
                id={`${id}-font-size`}
                label='Font size'
                description='Scale source and query text.'
              >
                <Select
                  value={settings.fontSize.toString()}
                  onValueChange={(value) =>
                    updateSettings({ fontSize: parseInt(value) })
                  }
                >
                  <SelectTrigger
                    id={`${id}-font-size`}
                    className='w-full sm:w-32'
                  >
                    <SelectValue placeholder='Font size' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='12'>12px</SelectItem>
                    <SelectItem value='14'>14px</SelectItem>
                    <SelectItem value='16'>16px</SelectItem>
                    <SelectItem value='18'>18px</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>

              <SettingRow
                id={`${id}-tab-size`}
                label='Tab size'
                description='Indentation width for tab characters.'
              >
                <Select
                  value={settings.tabSize.toString()}
                  onValueChange={(value) =>
                    updateSettings({ tabSize: parseInt(value) })
                  }
                >
                  <SelectTrigger
                    id={`${id}-tab-size`}
                    className='w-full sm:w-32'
                  >
                    <SelectValue placeholder='Tab Size' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='2'>2 spaces</SelectItem>
                    <SelectItem value='4'>4 spaces</SelectItem>
                    <SelectItem value='8'>8 spaces</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>

              <SettingRow
                id={`${id}-keybindings`}
                label='Keybindings'
                description='Use standard editor shortcuts or Vim bindings.'
              >
                <Select
                  value={settings.keybindings.toString()}
                  onValueChange={(value) =>
                    updateSettings({ keybindings: value as 'default' | 'vim' })
                  }
                >
                  <SelectTrigger
                    id={`${id}-keybindings`}
                    className='w-full sm:w-32'
                  >
                    <SelectValue placeholder='Default' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='default'>Default</SelectItem>
                    <SelectItem value='vim'>Vim</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
            </SettingSection>

            <SettingSection title='Syntax'>
              <div className='grid gap-3 p-3'>
                <Label htmlFor={`${id}-syntax-theme`} className='grid gap-1'>
                  <span className='text-sm font-medium'>Theme</span>
                  <span className='text-muted-foreground text-xs font-normal'>
                    Choose the syntax highlighting color palette.
                  </span>
                </Label>
                <Select
                  value={settings.syntaxTheme}
                  onValueChange={(value) =>
                    updateSettings({ syntaxTheme: value as EditorSyntaxTheme })
                  }
                >
                  <SelectTrigger id={`${id}-syntax-theme`} className='w-full'>
                    <SelectValue placeholder='Syntax theme' />
                  </SelectTrigger>
                  <SelectContent className='w-[var(--radix-select-trigger-width)]'>
                    {syntaxThemeGroups.map(({ family, themes }) => (
                      <SelectGroup key={family}>
                        <SelectLabel>{family}</SelectLabel>
                        {themes.map(({ label, swatches, value }) => (
                          <SelectItem key={value} value={value}>
                            <span className='flex min-w-0 items-center gap-2'>
                              <span
                                aria-hidden='true'
                                className='border-border flex shrink-0 overflow-hidden rounded-sm border'
                              >
                                {swatches.map((swatch) => (
                                  <span
                                    key={swatch}
                                    className='h-3 w-3'
                                    style={{ backgroundColor: swatch }}
                                  />
                                ))}
                              </span>
                              <span className='truncate'>{label}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </SettingSection>
          </div>

          <DialogFooter className='px-6 py-6'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => updateSettings(editorDefaults)}
              disabled={!settingsChanged}
            >
              <RotateCcw className='h-3.5 w-3.5' />
              Reset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
