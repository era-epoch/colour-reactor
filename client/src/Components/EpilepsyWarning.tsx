interface Props {}

const EpilepsyWarning = (props: Props): JSX.Element => {
  return (
    <div className="EpilepsyWarning dialogue">
      <div className="dialogue-content">
        <div className="warning-title">WARNING: PHOTOSENSITIVITY/EPILEPSY SEIZURES</div>
        <div className="warning-blurb">
          This tool can create rapidly flashing and/or strobing bright colours. If you have an epileptic condition or
          suffer from seizures, please use caution as it may not be safe for you to use this tool.
        </div>
      </div>
    </div>
  );
};

export default EpilepsyWarning;
