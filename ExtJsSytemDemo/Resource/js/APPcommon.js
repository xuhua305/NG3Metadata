w = window;

function $GetWFrame() {
    try {
        var cw = window;
        while (cw != top) {
            if (cw.MainFrame)
                break;
            else
                cw = cw.parent;
        }
    } catch (e) { }
    return cw.MainFrame;
}

function $CloseTab(n) {
    var f = $GetWFrame();
    if (f && f.Center) {

        //debugger;
        //f.Checker.fireEvent('checkin', f.Checker);//触发签入操作
      
        var tab = f.Center.getComponent(n) || f.Center.getActiveTab();

        f.Center.remove(tab);
    }
    else {
        w.close();
    }
}