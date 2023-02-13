export default function PanelAccount({panel_refs}) {

  return (
    <div id="panel-3" ref={(el) => panel_refs.current[2] = el} class="mt-8 border border-sky-500 w-full" style={{border: 'solid deepskyblue 5px', position: 'absolute', zIndex: 0, opacity: 0, display: 'none'}}>
      Panel 2: Account
    </div>
  );
}